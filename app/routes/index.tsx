import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Form, useLoaderData, useTransition } from '@remix-run/react'
import { useEffect, useRef, useState } from 'react'
import type { ChatMessage } from '~/chat'
import { getSessionUser, getUsers, sendMessage } from '~/chat.server'
import ChatComponents from '~/components/chat'
import Layout from '~/components/Layout'
import { destroySession, getSession } from '~/session.server'

const MAX_MESSAGE_LENGTH = 256

interface LoaderData {
  user: string
  users: string[]
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getSessionUser(request)
  return json<LoaderData>({ user, users: getUsers() })
}

export const action: ActionFunction = async ({ request }) => {
  const user = await getSessionUser(request)
  const formData = await request.formData()
  const action = String(formData.get('_action'))

  if (action === 'logout') {
    const session = await getSession(request.headers.get('Cookie'))
    return redirect('/login', {
      headers: { 'Set-Cookie': await destroySession(session) },
    })
  }

  if (action === 'send-message') {
    const message = String(formData.get('message')).slice(0, MAX_MESSAGE_LENGTH)
    if (message.length > 0) {
      sendMessage(user, message)
    }
  }

  return null
}

export default function Chat() {
  const loaderData = useLoaderData<LoaderData>()
  const transition = useTransition()
  const formRef = useRef<HTMLFormElement>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [users, setUsers] = useState<Set<string>>(
    () => new Set(loaderData.users)
  )

  useEffect(() => {
    if (transition.state === 'submitting') {
      formRef.current?.reset()
    }
  }, [transition.state])

  useEffect(() => {
    const eventSource = new EventSource('/live')

    eventSource.addEventListener('message', event => {
      const data = JSON.parse(event.data)
      setMessages(messages => [
        ...messages,
        { user: data.user, message: data.message },
      ])
    })

    eventSource.addEventListener('user-joined', event => {
      const user = event.data

      setUsers(users => new Set([...users, user]))
      setMessages(messages => [
        ...messages,
        { user: 'System', message: `"${user}" joined the chat` },
      ])
    })

    eventSource.addEventListener('user-left', event => {
      const user = event.data

      setUsers(users => new Set([...users].filter(u => u !== user)))
      setMessages(messages => [
        ...messages,
        { user: 'System', message: `"${user}" left the chat` },
      ])
    })

    return () => eventSource.close()
  }, [])

  return (
    <Layout userName={loaderData.user}>
    <ChatComponents user={loaderData.user} users={users} messages={messages} />
    </Layout>
  )
}
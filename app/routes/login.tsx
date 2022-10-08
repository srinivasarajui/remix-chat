import type { ActionFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { useActionData } from '@remix-run/react'
import Layout from '~/components/Layout'
import LoginComponent from '~/components/login'
import { commitSession, getSession } from '~/session.server'

interface ActionData {
  error?: string
}

const MAX_USERNAME_LENGTH = 20

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'))
  const formData = await request.formData()
  const user = String(formData.get('user')).slice(0, MAX_USERNAME_LENGTH)
  if (
    user.length <= 0 ||
    user.toLowerCase() === 'system'
  ) {
    return json<ActionData>({
      error: 'Invalid username or user already exists',
    })
  }
  session.set('user', user)
  return redirect('/', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  })
}

export default function Login() {
  const actionData = useActionData<ActionData>()
  return (
     <Layout>
      <LoginComponent errorMessage={actionData?.error} />
    </Layout>
  )
}
import { Form } from "@remix-run/react";

export interface INavBarProps {
  userName?: string;
}

export default function NavBar(props: INavBarProps) {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start"></div>
      <div className="navbar-center">
        <span className="normal-case text-xl">Remix Chat</span>
      </div>

      <div className="navbar-end">
        {props.userName ? (
          <>
            <span>{props.userName}</span>
            <Form method="post">
              <button
                type="submit"
                name="_action"
                value="logout"
                className="btn btn-ghost btn-circle"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            </Form>
          </>
        ) : null}
      </div>
    </div>
  );
}

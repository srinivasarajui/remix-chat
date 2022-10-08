import { Form } from "@remix-run/react";
import * as React from "react";
import Alert from "./Alert";

export interface ILoginComponentProps {
  errorMessage?: string;
}

export default function LoginComponent(props: ILoginComponentProps) {
  return (
    <Form method="post">
      <div className="flex-grow h-auto place-items-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="form-control">
            <label className="justify-center label">
              <span className="label-text" id="launch-username">
                Enter Username
              </span>
            </label>
            <input
              type="text"
              name="user"
              placeholder="Username"
              className="input input-bordered"
              aria-labelledby="launch-username"
            />
          </div>
          <div></div>
          <div>
            <button
              data-testid="landing-go"
              type="submit"
              className="btn btn-primary"
            >
              Join
            </button>
          </div>
          {props.errorMessage && (
            <div>
              <Alert>
                <span>{props.errorMessage}</span>
              </Alert>
            </div>
          )}
        </div>
      </div>
    </Form>
  );
}

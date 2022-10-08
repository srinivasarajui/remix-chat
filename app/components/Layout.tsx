import Footer from "./Footer";
import NavBar from "./navbar";

export interface ILayoutProps {
    children: JSX.Element
    userName?: string;
}

export default function Layout (props: ILayoutProps) {
  return (
    <div className="flex flex-col md:min-h-screen">
      <NavBar userName={props.userName}/>
      <main className="grow flex flex-col px-2 py-1 md:py-6 mg:px-6 ">
      <>{props.children}</>
      </main>
      <Footer />
      </div>
  );
}

import React from "react";
import "./App.css";
import { ClerkProvider, SignedOut, useUser, SignIn } from "@clerk/clerk-react";
import { HashRouter, Route } from "react-router-dom";

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw "Missing Publishable Key";
}

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

const App = () => {
  return (
    <ClerkProvider clerkPubKey={clerkPubKey}>
      <HashRouter>
        <Route path="/" component={Welcome}>
          <SignedOut>
            <SignIn path="/login" routing="hash" redirectUrl="/" />
          </SignedOut>
        </Route>
      </HashRouter>
    </ClerkProvider>
  );
};

function Welcome() {
  const user = useUser();
  if (user) {
    return <div>Hello {user.name}!</div>;
  } else {
    return <div>You are not signed in</div>;
  }
}

export default App;

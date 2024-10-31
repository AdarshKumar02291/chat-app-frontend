import { TestContext } from "../context/Testcontext";
import { useContext } from "react";
function Test() {
  const value = useContext(TestContext);
  return <div>Hello from test {value.abc}</div>;
}

export default Test;

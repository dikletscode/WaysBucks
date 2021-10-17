import { icon } from "../../../assets/assetsRegister";

const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: any;
  resetErrorBoundary: any;
}) => {
  return (
    <div className="fixed z-50 flex pt-32 flex-col  items-center mx-auto w-screen h-screen bg-white ">
      <p>Something went wrong:</p>
      <img src={icon.error} className="h-1/2 " />
      <pre>{error.message}</pre>
      <div className="bg-base py-3 px-10 text-white">
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    </div>
  );
};
export default ErrorFallback;

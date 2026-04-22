/**
 * @returns Success Page
 * @used_in /dashboard/users/create
 * @description Success page user receives when a creater has successfully been made
 * @screen_size < 786px
 */

const SuccessfulSubmission = ({ successURL = "null", message=null }) => {
  return (
    <div className="text-white h-full w-full flex flex-col gap-4 items-center justify-center">
          <h2 className="text-2xl text-green-400">Success!</h2>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        fill="#05df72"
        className="bi bi-check-circle-fill"
        viewBox="0 0 16 16"
      >
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
          </svg>
          
          {message ? <><br></br><p className="text-white italic">{message}</p></>: null}
      {successURL ? (
        <>
          <br></br>
          <a
            className="bg-white p-2 pl-10 pr-10 rounded border border-transparent text-amber-950 hover:border-white hover:bg-transparent hover:text-white cursor-pointer"
            href={successURL}
          >
            Continue
          </a>
        </>
      ) : null}
    </div>
  );
};

export default SuccessfulSubmission;

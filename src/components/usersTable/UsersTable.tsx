
import Header from "./Header"
import UsersRow from "./UsersRow"

const UsersTable = () => {

  return (
    <div className="w-[95%] h-[85%] border rounded-lg">
      <Header />
      {/*TODO: Mapping Logic -> UsersRow */}
          <UsersRow/>
    </div>
  )
}

export default UsersTable

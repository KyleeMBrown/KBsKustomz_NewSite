import SettingsForm from '@/components/SettingsForm'
import { getUser } from '@/ServerActions/User/user'

const page = async() => {

  // retrieve user id
  const id:string = (await getUser())?.sub;

  return (
    <div className="bg-[#461901] h-[92vh] max-[365px]:h-auto">
      <SettingsForm userId={id} />
    </div>
  )
}

export default page
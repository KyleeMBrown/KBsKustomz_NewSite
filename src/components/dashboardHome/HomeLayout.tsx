import Header from '@/components/dashboardHome/Header'
import { getUser, getUserMetaData } from '@/ServerActions/User/user';
import MainContent from '@/components/dashboardHome/MainContent';

const HomeLayout = async () => {
    // retrieve the userId from the session
    const userToken = await getUser();
    const userId = userToken?.sub;
    // use Server func getUser to retrieve the current user
    const user = await getUserMetaData(userId)
    
  return (
    <div className="p-[3em] flex flex-col gap-6 max-[768px]:gap-2">
          <Header userFirstName={user?.first_name} role={user?.role} />
          <MainContent/>
    </div>
  )
}

export default HomeLayout
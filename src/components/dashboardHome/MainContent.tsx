
import ChangePassword from './widgets/ChangePassword'
import GeneralSettings from './widgets/GeneralSettings'
import ImageCount from './widgets/ImageCount'
import ManageImages from './widgets/ManageImages'
import UploadImages from './widgets/UploadImages'

const MainContent = () => {
  return (
      <div>
          {/* Row*/}
          <div className="flex items-center justify-center w-full h-auto gap-6 max-[768px]:gap-2 flex-wrap">
              <ImageCount/>
              <UploadImages />
              <ManageImages />
              <GeneralSettings />
              <ChangePassword />
          </div>
    </div>
  )
}

export default MainContent
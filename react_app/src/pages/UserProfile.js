import UserPhotoList from '../components/UserPhotoList.js';
import NavLink from '../routes/NavLink.js';
import UserInfo from '../components/UserInfo.js';
import UploadPhoto from '../components/UploadPhoto.js'

function UserProfile() {

  return (
    <>
          <NavLink />
          <UserInfo />
          <UploadPhoto />
          <UserPhotoList />
    </>
  );
}

export default UserProfile;
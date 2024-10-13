import UserPhotoList from '../components/UserPhotoList.js';
import NavLink from '../routes/NavLink.js';
import UserInfo from '../components/UserInfo.js';
import UploadPhoto from '../components/UploadPhoto.js'
import UploadAvatar from '../components/UploadAvatar.js'
import Header from '../components/Header.js';
import Notifications from '../components/Notifications.js';

function UserProfile() {

  return (
    <>
          <Notifications/>
          <Header />
          <UploadPhoto />
          <UploadAvatar />
          <UserPhotoList />
    </>
  );
}

export default UserProfile;
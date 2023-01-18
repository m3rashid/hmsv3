import AdminWrapper from "components/Admin/adminWrapper";
import ProfileWrapper from "components/Profile/ProfileWrapper";
import CreateUserModal from "components/Admin/modules/helpers/createUserModal";
import DataMigrationInput from "./helpers/data-migration";

const Home = () => {
  return (
    <ProfileWrapper>
      <AdminWrapper hideHeading>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <CreateUserModal isEdit={false} />
          <DataMigrationInput />
        </div>
      </AdminWrapper>
    </ProfileWrapper>
  );
};

export default Home;

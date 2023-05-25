import { showGender, toSentenceCase } from "utils/strings";
import CreateUserModal from "components/Admin/modules/helpers/createUserModal";
import UserDetailsModal from "components/Admin/modules/helpers/userDetailsModal";

export const formatForTable = (users) => {
  const data = users.reduce((acc, user) => {
    try {
      return [
        ...acc,
        {
          id: user.id,
          profileId: user.Auth[0].profileId,
          name: user.Auth[0].name,
          email: user.Auth[0].email,
          permissions: user.Auth[0].permissions,
          address: user.address,
          authorityName: user.authorityName,
          availability: user.availability,
          availableDays: user.availableDays,
          bio: user.bio,
          category: user.category,
          contact: user.contact,
          joined: user.createdAt,
          designation: user.designation,
          origin: user.origin,
          role: toSentenceCase(user.role),
          roomNumber: user.roomNumber,
          sex: showGender(user.sex),
        },
      ];
    } catch (err) {
      return [...acc];
    }
  }, []);
  return data;
};

export const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.title.localeCompare(b.title),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    sorter: (a, b) => a.title.localeCompare(b.title),
  },
  {
    title: "Joined",
    dataIndex: "joined",
    key: "joined",
    sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  },
  {
    title: "Room Number",
    dataIndex: "roomNumber",
    key: "roomNumber",
  },
  {
    title: "Actions",
    dataIndex: "",
    key: "details",
    render: (text, record) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <UserDetailsModal data={record} />
        <CreateUserModal data={record} isEdit={true} />
      </div>
    ),
  },
];

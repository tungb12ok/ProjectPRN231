import { useEffect, useState } from "react";
import {
  Card,
  Breadcrumbs,
  CardBody,
  Typography,
  Avatar,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faArrowUp,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { fetchAllUsers, ActiveUser } from "../../services/ManageUserService";
import HeaderStaff from "../Staff/HeaderStaff";
import SidebarStaff from "../Staff/SidebarStaff";
import { data } from "autoprefixer";

export default function ManageUser() {
  const [users, setUsers] = useState([]);
  const [update, setUpdate] = useState(true);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleActive = async (id, status) => {
    await ActiveUser(id, status)
      .then((data) => {
        setUpdate(!update);
        console.log('Cập nhật thành công');
      })
      .catch((data) => {
        console.log('Cập nhật thất bại');
      })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await fetchAllUsers();
        setUsers(usersData);
        console.log(usersData);
      } catch (error) {
        console.log(error);
        setUsers([]);
      }
    };

    fetchData();
  }, [update]);

  const onSelectChange = (selectedKey) => {
    setSelectedRowKeys((prevSelectedRowKeys) =>
      prevSelectedRowKeys.includes(selectedKey)
        ? prevSelectedRowKeys.filter((key) => key !== selectedKey)
        : [...prevSelectedRowKeys, selectedKey]
    );
  };

  return (
    <>

      <div className="flex h-screen bg-gray-100">
        <div className="w-2/12 h-full fixed">
          <SidebarStaff />
        </div>
        <Card className="flex flex-col w-10/12 ml-auto">
          <HeaderStaff />
          <main className="flex-1 p-2 mt-16 ml-3">

            <Typography variant="h6" color="black" className="text-2xl font-bold mb-4">
              User Management
            </Typography>

            <CardBody className="overflow-scroll px-0">
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                      <Checkbox
                        color="blue"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedRowKeys(users.map((row) => row.id));
                          } else {
                            setSelectedRowKeys([]);
                          }
                        }}
                        checked={selectedRowKeys.length === users.length}
                        indeterminate={
                          selectedRowKeys.length > 0 &&
                          selectedRowKeys.length < users.length
                        }
                      />
                    </th>
                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                      <Typography
                        variant="large"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        UserName
                      </Typography>
                    </th>
                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                      <Typography
                        variant="large"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        FullName
                      </Typography>
                    </th>
                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                      <Typography
                        variant="large"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        Email
                      </Typography>
                    </th>
                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                      <Typography
                        variant="large"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        RoleName
                      </Typography>
                    </th>
                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                      <Typography
                        variant="large"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        Gender
                      </Typography>
                    </th>
                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                      <Typography
                        variant="large"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        Phone
                      </Typography>
                    </th>
                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                      <Typography
                        variant="large"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        birthDate
                      </Typography>
                    </th>
                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                      <Typography
                        variant="large"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        createdDate
                      </Typography>
                    </th>
                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                      <Typography
                        variant="large"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        lastUpdate
                      </Typography>
                    </th>
                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                      <Typography
                        variant="large"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        Trạng thái tài khoản
                      </Typography>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => {
                    const isLast = index === users.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";
                    const isSelected = selectedRowKeys.includes(user.id);

                    return (
                      <tr key={user.id} className={isSelected ? "bg-blue-100" : ""}>
                        <td className={classes}>
                          <Checkbox
                            color="blue"
                            checked={isSelected}
                            onChange={() => onSelectChange(user.id)}
                          />
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {user.userName}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {user.fullName}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {user.email}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <div className="flex items-center">
                            {/* <Avatar
                          size="sm"
                          src={user.shipmentDetail.user.avatarUrl}
                          className="rounded-full mr-2 w-8 h-8"
                          alt={user.shipmentDetail.fullName}
                        /> */}
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {user.roleName}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex items-center">
                            {/* <span
                          className={`inline-block w-2 h-2 mr-2 rounded-full ${
                            user.status === "Delivered"
                              ? "bg-green-500"
                              : user.status === "Cancelled"
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        ></span> */}
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {user.gender}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {user.phone}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {new Date(user.birthDate).toLocaleDateString()}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {new Date(user.createdDate).toLocaleDateString()}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {new Date(user.lastUpdate).toLocaleDateString()}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <div className="flex justify-center items-center">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal flex items-center"
                            >
                              {user.isActive ? "Hoạt động" : "Khóa"}
                              <Button
                                onClick={() => handleActive(user.id, !user.isActive)}
                                className={`ml-5 ${user.isActive ? 'bg-red-500 text-white' : 'bg-green-500 text-white'} `}
                                type="button"
                              >
                                {user.isActive ? "DeActive" : "Active"}
                              </Button>
                            </Typography>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardBody>
          </main>
        </Card>
      </div >
    </>
  );
}

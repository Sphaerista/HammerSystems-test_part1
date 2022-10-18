import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Card, Table, Tag, Tooltip, message, Button } from "antd";
import AvatarStatus from "components/shared-components/AvatarStatus";
import { EyeOutlined } from "@ant-design/icons";
import Loading from "components/shared-components/Loading";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const showUserProfile = (user) => {
    console.log(user);
    history.push(`edit-client/${user.id}`);
  };

  const getUser = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error("failed to fetch");
    }
    const data = await response.json();
    setUsers(data);
    setLoading(false);
    return data;
  };
  useEffect(() => {
    getUser();
  }, []);

  const tableColumns = [
    {
      title: "User",
      dataIndex: "name",
      render: (_, record) => (
        <div className="d-flex">
          <AvatarStatus
            src={record.img}
            name={record.name}
            subTitle={record.email}
          />
        </div>
      ),
      sorter: {
        compare: (a, b) => {
          a = a.name.toLowerCase();
          b = b.name.toLowerCase();
          return a > b ? -1 : b > a ? 1 : 0;
        },
      },
    },
    {
      title: "Username",
      dataIndex: "username",
      sorter: {
        compare: (a, b) => {
          a = a.username.toLowerCase();
          b = b.username.toLowerCase();
          return a > b ? -1 : b > a ? 1 : 0;
        },
      },
    },
    {
      title: "Website",
      dataIndex: "website",
      sorter: {
        compare: (a, b) => {
          a = a.website.toLowerCase();
          b = b.website.toLowerCase();
          return a > b ? -1 : b > a ? 1 : 0;
        },
      },
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: {
        compare: (a, b) => {
          a = a.phone;
          b = b.phone;
          return a > b ? -1 : b > a ? 1 : 0;
        },
      },
    },
    {
      title: "",
      dataIndex: "actions",
      render: (_, elm) => (
        <div className="text-right">
          <Tooltip title="View">
            <Button
              type="primary"
              className="mr-2"
              icon={<EyeOutlined />}
              onClick={() => {
                showUserProfile(elm);
              }}
              size="medium"
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <>
      {loading ? (
        <Loading cover="content" />
      ) : (
        <Card bodyStyle={{ padding: "0px" }}>
          <Table columns={tableColumns} dataSource={users} rowKey="id" />
        </Card>
      )}
    </>
  );
};

export default UserList;

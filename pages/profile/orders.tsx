import React from "react";
import ProfileLayout from "../../components/layouts/ProfileLayout";
import UserOrders from "../../components/profile/UserOrders";

export default function orders() {
  return (
    <ProfileLayout>
      <UserOrders />
    </ProfileLayout>
  );
}

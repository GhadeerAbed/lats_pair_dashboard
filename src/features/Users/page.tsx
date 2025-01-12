// "use client";
// import { Button } from "@/components/page";
// import React, { useState } from "react";
// import TableList from "./TableList";
// import { AddProduct } from "./components/page";
// import AddForm from "./components/AddForm/page";

// export const Products = () => {
//   const [showAddForm, setShowAddForm] = useState(false);

//   const handleAddClick = () => {
//     setShowAddForm(true);
//   };

//   const handleCancelClick = () => {
//     setShowAddForm(false);
//   };

//   return (
//     <div>
//       {!showAddForm ? (
//         <div className="lg:w-[1000px] w-[600px]">
//           <div className="bg-white  p-3 rounded-md flex justify-between items-center ">
//             <p className="font-semibold  text-lg">{("sidebar.products")} </p>
//             <Button
//               buttonSize="small"
//               className="bg-primary text-white "
//               type="button"
//               onClick={handleAddClick}
//             >
//               {("add")}
//             </Button>
//           </div>
//           <TableList />
//         </div>
//       ) : (
//         <div className="flex flex-col xl:w-[1100px] lg:w-[900px] w-[600px]">
//           <div className="bg-white  p-3 rounded-md flex items-center  mb-3  ">
//             <p className="font-semibold  text-lg">
//               {("sidebar.products")} {`>`} {("add")}
//             </p>
//           </div>
//           <AddForm />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Products;

import React, { useState } from "react";
import TableList from "./TableList";
import { AddUserForm } from "./components/page";
import UserPreferencesForm from "./components/UserPreferencesForm/page";

export const Users = () => {
  return (
    <div >
      {/* <TableList /> */}
      {/* <AddUserForm />
      <UserPreferencesForm/> */}
    </div>
  );
};

export default Users;

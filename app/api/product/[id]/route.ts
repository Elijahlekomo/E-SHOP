// import { getCurrentUser } from "@/actions/getCurrentUser";
// import { NextResponse } from "next/server";
// //import  prisma  from "@/libs/prismadb";

// type Context = {
//   params: {
//     id: string;
//   };
// };

// export async function DELETE(request: Request, context: Context) {
//   const { params } = context; // Destructure params from the context

//   const currentUser = await getCurrentUser();

//   if (!currentUser) {
//     return NextResponse.error();
//   }

//   if (currentUser.role !== "ADMIN") {
//     return NextResponse.error();
//   }

//   const product = await prisma?.product.delete({
//     where: { id: params.id },
//   });

//   return NextResponse.json(product);
// }

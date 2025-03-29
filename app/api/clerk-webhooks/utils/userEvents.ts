import prisma from "@/lib/prisma";
import { WH_UserCreated } from "@/types/ClerkWebHooks/userCreated";
import { WH_UserDeleted } from "@/types/ClerkWebHooks/userDeleted";
import { WH_UserUpdated } from "@/types/ClerkWebHooks/userUpdated";

export async function handleUserCreated(payload: WH_UserCreated) {
  const data = payload.data;
  try {
    const user = await prisma.user.create({
      data: {
        clerkId: data.id,
        email: data.email_addresses[0].email_address,
        firstName: data.first_name,
        lastName: data.last_name,
        imgUrl: data.image_url,
        username: data.username,
      },
    });

    console.log("User created", user);
  } catch (err) {
    console.error("Error: Could not create user:", err);
    return new Response("Error: Could not create user", {
      status: 400,
    });
  }
}

export async function handleUserDeleted(payload: WH_UserDeleted) {
  const data = payload.data;

  try {
    const user = await prisma.user.delete({
      where: { clerkId: data.id },
    });

    console.log("User deleted", user);
  } catch (err) {
    console.log("Error: Could not delete user:", err);
    return new Response("Error: Could not delete user", { status: 400 });
  }
}

export async function handleUserUpdated(payload: WH_UserUpdated) {
  const data = payload.data;

  try {
    const user = await prisma.user.update({
      where: { clerkId: data.id },
      data: {
        email: data.email_addresses[0].email_address,
        firstName: data.first_name,
        lastName: data.last_name,
        imgUrl: data.image_url,
        username: data.username,
      },
    });

    console.log("User updated", user);
  } catch (err) {
    console.log("Error: Could not update user:", err);
    return new Response("Error: Could not update user", { status: 400 });
  }
}

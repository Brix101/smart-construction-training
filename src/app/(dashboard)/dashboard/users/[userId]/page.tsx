interface UpdateUserPageProps {
  params: {
    userId: string
  }
}

export default async function UpdateUserPage({ params }: UpdateUserPageProps) {
  console.log({ params })
  return <div>user</div>
}

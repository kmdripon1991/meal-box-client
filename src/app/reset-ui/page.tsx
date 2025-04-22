import { RestUiForm } from "@/components/modules/user/RestUiForm";

const ResetUiPage = ({
  searchParams,
}: {
  searchParams: { token?: string; email?: string };
}) => {
  if (!searchParams.token || !searchParams.email) {
    return <div>Invalid reset link</div>;
  }

  return (
    <div>
      <RestUiForm token={searchParams.token} email={searchParams.email} />
    </div>
  );
};

export default ResetUiPage;

import { ShowAppointment } from "@/features/Appointments/components/page";


const page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <ShowAppointment id={params.id} />
    </div>
  );
};

export default page;

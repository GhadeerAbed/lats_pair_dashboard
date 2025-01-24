import BookingCalendar from "@/features/Dashboard/components/BookingCalendar/page";



const slot = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <BookingCalendar id={params.id} />
    </div>
  );
};

export default slot;

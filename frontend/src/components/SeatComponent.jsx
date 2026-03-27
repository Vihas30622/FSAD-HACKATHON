export default function SeatComponent({ seat, isSelected, onSelect }) {
  const getSeatClasses = () => {
    if (seat.status === 'booked') {
      return 'bg-red-500 text-white cursor-not-allowed opacity-60'
    }
    if (isSelected) {
      return 'bg-blue-500 text-white ring-4 ring-blue-300'
    }
    if (seat.seat_class === 'business' || seat.seat_class === 'premium') {
      return 'bg-yellow-400 text-gray-900'
    }
    // available
    return 'bg-green-500 text-white'
  }

  return (
    <button
      type="button"
      disabled={seat.status === 'booked'}
      onClick={() => onSelect(seat)}
      className={`h-10 w-10 rounded-md text-[10px] font-semibold flex items-center justify-center transition-transform ${
        seat.status === 'booked' ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-110'
      } ${getSeatClasses()}`}
      title={`${seat.seat_number} • ${seat.status}`}
    >
      {seat.seat_number}
    </button>
  )
}


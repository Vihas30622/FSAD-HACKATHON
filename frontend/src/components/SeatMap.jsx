import SeatComponent from './SeatComponent'

// Render classic 3-3 layout: A B C | aisle | D E F
export default function SeatMap({ seats, selectedSeat, onSelectSeat }) {
  // Backend seat numbers are not guaranteed to be A/B/C-like. To keep a realistic 3-3 cabin,
  // we place seats into a 6-seat-per-row grid (A B C | aisle | D E F) based on ordering.
  const sorted = [...seats].sort((a, b) => {
    if (a.id && b.id) return a.id - b.id
    return String(a.seat_number || '').localeCompare(String(b.seat_number || ''))
  })

  const seatsPerRow = 6
  const rowCount = Math.ceil(sorted.length / seatsPerRow)

  return (
    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
      {Array.from({ length: rowCount }).map((_, rowIndex) => {
        const rowSeats = sorted.slice(rowIndex * seatsPerRow, rowIndex * seatsPerRow + seatsPerRow)
        const left = rowSeats.slice(0, 3) // A B C
        const right = rowSeats.slice(3, 6) // D E F

        return (
          <div key={rowIndex} className="flex items-center justify-center gap-6">
            <div className="flex gap-2">
              {left.map((seat) => (
                <SeatComponent
                  key={seat.seat_number}
                  seat={seat}
                  isSelected={selectedSeat === seat.seat_number}
                  onSelect={onSelectSeat}
                />
              ))}
            </div>

            <div className="w-8 text-center text-[10px] text-gray-400 font-semibold uppercase tracking-[0.2em]">
              Aisle
            </div>

            <div className="flex gap-2">
              {right.map((seat) => (
                <SeatComponent
                  key={seat.seat_number}
                  seat={seat}
                  isSelected={selectedSeat === seat.seat_number}
                  onSelect={onSelectSeat}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}


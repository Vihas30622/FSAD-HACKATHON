export default function ProfilePage() {
  return (
    <div className="pt-24 pb-16 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="bg-surface-container-lowest rounded-xl shadow-sm p-8">
        <h1 className="font-headline text-4xl font-bold mb-4">My Profile</h1>
        <p className="text-on-surface-variant mb-8">Manage your Bharat Airways account and preferences</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Full Name</label>
              <input
                type="text"
                defaultValue="Arjun Malhotra"
                className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg px-4 py-3"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                defaultValue="arjun@example.com"
                className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg px-4 py-3"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Phone</label>
              <input
                type="tel"
                defaultValue="+91 98765 43210"
                className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg px-4 py-3"
                readOnly
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-primary/10 rounded-lg p-6 border border-primary/20">
              <h3 className="font-headline font-bold text-xl mb-2 text-primary">Silver Wings Status</h3>
              <p className="text-on-surface-variant mb-4">42,850 miles earned</p>
              <div className="w-full bg-primary/20 h-2 rounded-full mb-2">
                <div className="bg-primary h-full rounded-full" style={{ width: '65%' }}></div>
              </div>
              <p className="text-xs text-on-surface-variant">7,150 miles to Gold Status</p>
            </div>

            <div className="space-y-3">
              <h4 className="font-headline font-bold">Recent Bookings</h4>
              <div className="bg-surface-container rounded-lg p-4">
                <p className="text-sm">DEL → BOM • Dec 15, 2024</p>
                <p className="text-xs text-on-surface-variant">Booking ID: BA928374-C</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

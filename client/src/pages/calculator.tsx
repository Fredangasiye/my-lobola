// This is a "Safe Mode" version of your calculator page.
// It renders almost nothing.

export default function Calculator() {
  return (
    <div className="p-8 bg-yellow-100 border border-yellow-300 rounded-lg">
      <h1 className="text-2xl font-bold text-center">Calculator Page (Safe Mode)</h1>
      <p className="text-center text-gray-600 mt-2">
        If you can see this, the main layout is working correctly.
        The crash is happening inside one of the components we have removed.
      </p>
    </div>
  );
}
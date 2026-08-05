import { useState } from "react";
import BpkCalendar from "bpk-component-calendar";
import BpkButton from "bpk-component-button";
import BpkText from "bpk-component-text";
import { format } from "date-fns";

const daysOfWeek = [
  { name: "Sunday", nameAbbr: "Sun", index: 0, isWeekend: true },
  { name: "Monday", nameAbbr: "Mon", index: 1, isWeekend: false },
  { name: "Tuesday", nameAbbr: "Tue", index: 2, isWeekend: false },
  { name: "Wednesday", nameAbbr: "Wed", index: 3, isWeekend: false },
  { name: "Thursday", nameAbbr: "Thu", index: 4, isWeekend: false },
  { name: "Friday", nameAbbr: "Fri", index: 5, isWeekend: false },
  { name: "Saturday", nameAbbr: "Sat", index: 6, isWeekend: true },
];

function App() {
  const [date, setDate] = useState(new Date());

  return (
    <>
      <BpkText tagName="h1" textStyle="xxl" className="App__heading">
        Flight Schedule
      </BpkText>

      <BpkCalendar
        id="calendar"
        onDateSelect={(selectedDate) => setDate(selectedDate)}
        formatMonth={(date) => format(date, "MMMM yyyy")}
        formatDateFull={(date) => format(date, "EEEE, d MMMM yyyy")}
        daysOfWeek={daysOfWeek}
        weekStartsOn={1}
        changeMonthLabel="Change month"
        nextMonthLabel="Next month"
        previousMonthLabel="Previous month"
        selectionConfiguration={{
          type: "single",
          date: date,
        }}
      />

      <BpkButton onClick={() => alert("Continuing...")}>Continue</BpkButton>
    </>
  );
}

export default App;
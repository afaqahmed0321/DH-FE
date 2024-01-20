import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../../assets/css/calendar.css";

let eventGuid = 0;
var date = new Date();

const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: "78",
    start: date.toISOString().replace(/T.*$/, ""),
  },
  {
    id: createEventId(),
    title: "73",
    start: date.setDate(date.getDate() - 2),
  },
  {
    id: createEventId(),
    title: "23",
    start: date.setDate(date.getDate() - 3),
  },
];

function createEventId() {
  return String(eventGuid++);
}

const EventCalender = () => {

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        initialEvents={INITIAL_EVENTS}
        eventContent={renderEventContent}
      />
    </div>
  );
};

export default EventCalender;

function renderEventContent(eventInfo) {
  return (
    <>
      <label>{eventInfo.event.title}</label>
    </>
  );
}

import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { useRouter } from "expo-router";
import CompletionStepperCard from "../components/cards/CompletionStepperCard";
import HabitPickerRow from "../components/cards/HabitPickerRow";
import NoteFieldCard from "../components/cards/NoteFieldCard";
import StatusToggleCard from "../components/cards/StatusToggleCard";
import LabeledSection from "../components/ui/LabeledSection";
import ScreenShell from "../components/ui/ScreenShell";
import EntryActionBar from "../features/habits/EntryActionBar";
import EntryDateHeader from "../features/habits/EntryDateHeader";
import EntryTopBar, { type EntryMode } from "../features/habits/EntryTopBar";
import {
  deleteEntry,
  getDateKey,
  getEntryForDate,
  parseDateKey,
  saveEntry,
  type EntryStatus,
} from "../features/habits/entryStore";

const EMPTY_NOTE = "";

function getInitialEntryState(dateKey: string) {
  const savedEntry = getEntryForDate(dateKey);

  if (!savedEntry) {
    return {
      mode: "add" as EntryMode,
      status: "completed" as EntryStatus,
      completions: 1,
      note: EMPTY_NOTE,
    };
  }

  return {
    mode: "edit" as EntryMode,
    status: savedEntry.status,
    completions: savedEntry.completions,
    note: savedEntry.note,
  };
}

export default function EntryScreen() {
  const router = useRouter();
  const todayKey = getDateKey();
  const [mode, setMode] = useState<EntryMode>(() => getInitialEntryState(todayKey).mode);
  const [status, setStatus] = useState<EntryStatus>(() => getInitialEntryState(todayKey).status);
  const [completions, setCompletions] = useState(() => getInitialEntryState(todayKey).completions);
  const [note, setNote] = useState(() => getInitialEntryState(todayKey).note);

  const syncEntryState = useCallback(() => {
    const nextState = getInitialEntryState(todayKey);

    setMode(nextState.mode);
    setStatus(nextState.status);
    setCompletions(nextState.completions);
    setNote(nextState.note);
  }, [todayKey]);

  useFocusEffect(syncEntryState);

  const handleSave = () => {
    saveEntry({
      date: todayKey,
      status,
      completions,
      note,
    });

    setMode("edit");
    router.back();
  };

  const handleDelete = () => {
    deleteEntry(todayKey);
    syncEntryState();
  };

  const handleDecrement = () => {
    setCompletions((current) => Math.max(0, current - 1));
  };

  const handleIncrement = () => {
    setCompletions((current) => current + 1);
  };

  return (
    <ScreenShell
      scroll
      contentContainerStyle={{ paddingBottom: 120 }}
    >
      <EntryTopBar
        mode={mode}
        onClose={() => router.back()}
        onSave={handleSave}
      />

      <EntryDateHeader date={parseDateKey(todayKey)} />

      <LabeledSection label="HABIT">
        <HabitPickerRow
          title="Training habit"
          subtitle="Strength training & cardio"
          onPress={() => console.log("Pick habit")}
        />
      </LabeledSection>

      <LabeledSection label="STATUS">
        <StatusToggleCard
          value={status}
          onChange={setStatus}
        />
      </LabeledSection>

      <LabeledSection label="COMPLETIONS">
        <CompletionStepperCard
          value={completions}
          onDecrement={handleDecrement}
          onIncrement={handleIncrement}
        />
      </LabeledSection>

      <LabeledSection label="NOTE (OPTIONAL)">
        <NoteFieldCard
          value={note}
          onChangeText={setNote}
        />
      </LabeledSection>

      <EntryActionBar
        mode={mode}
        onSaveEntry={handleSave}
        onDeleteEntry={handleDelete}
      />
    </ScreenShell>
  );
}

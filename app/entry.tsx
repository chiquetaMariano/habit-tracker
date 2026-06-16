import React, { useState } from "react";
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

const ADD_NOTE = "";
const EDIT_NOTE = "Strength training + 30 min cardio";

export default function EntryScreen() {
  const router = useRouter();
  const [mode, setMode] = useState<EntryMode>("add");
  const [status, setStatus] = useState<"completed" | "not-completed">("completed");
  const [completions, setCompletions] = useState(1);
  const [note, setNote] = useState(ADD_NOTE);

  const toggleMode = () => {
    const nextMode: EntryMode = mode === "add" ? "edit" : "add";

    setMode(nextMode);
    setStatus("completed");
    setCompletions(1);
    setNote(nextMode === "edit" ? EDIT_NOTE : ADD_NOTE);
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
        onSave={() => console.log("Save entry")}
      />

      <EntryDateHeader date={new Date().toISOString().slice(0, 10)} />

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
        onSaveEntry={toggleMode}
        onDeleteEntry={() => console.log("Delete entry")}
      />
    </ScreenShell>
  );
}

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
  getSelectedDateKey,
  loadEntryForDate,
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
  const [targetDateKey, setTargetDateKey] = useState(() => getSelectedDateKey() ?? getDateKey());
  const [mode, setMode] = useState<EntryMode>(() => getInitialEntryState(targetDateKey).mode);
  const [status, setStatus] = useState<EntryStatus>(() => getInitialEntryState(targetDateKey).status);
  const [completions, setCompletions] = useState(() => getInitialEntryState(targetDateKey).completions);
  const [note, setNote] = useState(() => getInitialEntryState(targetDateKey).note);

  const syncEntryState = useCallback(() => {
    let isActive = true;
    const nextTargetDateKey = getSelectedDateKey() ?? getDateKey();

    loadEntryForDate(nextTargetDateKey)
      .then(() => {
        if (!isActive) {
          return;
        }

        const nextState = getInitialEntryState(nextTargetDateKey);

        setTargetDateKey(nextTargetDateKey);
        setMode(nextState.mode);
        setStatus(nextState.status);
        setCompletions(nextState.completions);
        setNote(nextState.note);
      })
      .catch((error) => {
        console.error("Failed to load entry", error);
      });

    return () => {
      isActive = false;
    };
  }, []);

  useFocusEffect(syncEntryState);

  const handleSave = async () => {
    try {
      await saveEntry({
        date: targetDateKey,
        status,
        completions,
        note,
      });

      setMode("edit");
      router.back();
    } catch (error) {
      console.error("Failed to save entry", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteEntry(targetDateKey);
      const nextState = getInitialEntryState(targetDateKey);

      setMode(nextState.mode);
      setStatus(nextState.status);
      setCompletions(nextState.completions);
      setNote(nextState.note);
    } catch (error) {
      console.error("Failed to delete entry", error);
    }
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

      <EntryDateHeader date={parseDateKey(targetDateKey)} />

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

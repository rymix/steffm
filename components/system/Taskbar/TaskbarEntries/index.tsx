import StartButton from "components/system/Taskbar/StartButton";
import StyledTaskbarEntries from "components/system/Taskbar/TaskbarEntries/StyledTaskbarEntries";
import { useProcesses } from "contexts/process";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { useState } from "react";

const StartMenu = dynamic(() => import("components/system/StartMenu"));

const TaskbarEntry = dynamic(
  () => import("components/system/Taskbar/TaskbarEntry")
);

const TaskbarEntries: FC = () => {
  const { processes = {} } = useProcesses();
  const [startMenuVisible, setStartMenuVisible] = useState(false);
  const toggleStartMenu = (showMenu?: boolean): void =>
    setStartMenuVisible((currentMenuState) => showMenu ?? !currentMenuState);

  return (
    <>
      {startMenuVisible && <StartMenu toggleStartMenu={toggleStartMenu} />}
      <StyledTaskbarEntries>
        <AnimatePresence initial={false} presenceAffectsLayout={false}>
          <li>
            <StartButton
              startMenuVisible={startMenuVisible}
              toggleStartMenu={toggleStartMenu}
            />
          </li>
          {Object.entries(processes)
            .filter(
              ([, { closing, hideTaskbarEntry }]) =>
                !closing && !hideTaskbarEntry
            )
            .map(([id, { icon, title }]) => (
              <TaskbarEntry key={id} icon={icon} id={id} title={title} />
            ))}
        </AnimatePresence>
      </StyledTaskbarEntries>
    </>
  );
};

export default TaskbarEntries;

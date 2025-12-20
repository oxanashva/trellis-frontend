import { CreateBoardPicker } from "./CreateBoardPicker"
import { BoardPicker } from "./BoardPicker"
import { DatePicker } from "./DatePicker"
import { LabelPicker } from "./LabelPicker"
import { GroupPicker } from "./GroupPicker"
import { CoverPicker } from "./CoverPicker"
import { MemberPicker } from "./MemberPicker"
import Popover from "@mui/material/Popover"
import CloseIcon from "../../assets/images/icons/close.svg?react"

const TASK_PICKER_OFFSET = "68px";

export function DynamicPicker({
    picker,
    open,
    anchorEl,
    onClose,
    // board porps
    isStarred,
    setStarred,
    prefs,
    uploadedImages,
    onAddBoard,
    onUpdateBoard,
    onRemoveBoard,
    // group props
    boardId,
    groupId,
    setIsAddingTask,
    onRemoveGroup,
    // task props
    task,
    onUpdateTask,
    onAddLabel,
    onUpdateLabel,
    onRemoveLabel,
    members
}) {
    const isBoardPicker = ["CreateBoardPicker", "BoardPicker", "GroupPicker"].includes(picker.type)
    const isEditTaskPicker = ["MemberPicker", "LabelPicker", "DatePicker"].includes(picker.type)

    const renderPickerContent = () => {
        switch (picker.type) {
            case "CreateBoardPicker":
                return <CreateBoardPicker
                    onAddBoard={onAddBoard}
                    onClose={onClose}
                />
            case "BoardPicker":
                return <BoardPicker
                    isStarred={isStarred}
                    setStarred={setStarred}
                    prefs={prefs}
                    uploadedImages={uploadedImages}
                    onUpdateBoard={onUpdateBoard}
                    onRemoveBoard={onRemoveBoard}
                />
            case "GroupPicker":
                return <GroupPicker
                    boardId={boardId}
                    groupId={groupId}
                    setIsAddingTask={setIsAddingTask}
                    onRemoveGroup={onRemoveGroup}
                    onClose={onClose}
                />
            case "LabelPicker":
                return <LabelPicker
                    task={task}
                    onUpdateTask={onUpdateTask}
                    onAddLabel={onAddLabel}
                    onUpdateLabel={onUpdateLabel}
                    onRemoveLabel={onRemoveLabel}
                />
            case "DatePicker":
                return <DatePicker
                    task={task}
                    onUpdateTask={onUpdateTask}
                    onClose={onClose}
                />
            case "MemberPicker":
                return <MemberPicker
                    task={task}
                    members={members}
                    onUpdateTask={onUpdateTask}
                />
            case "CoverPicker":
                return <CoverPicker
                    task={task}
                    onUpdateTask={onUpdateTask}
                />
            default:
                return <p>UNKNOWN {picker.type}</p>
        }
    }

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={() => onClose(false)}
            anchorOrigin={{
                vertical: isEditTaskPicker ? "center" : "top",
                horizontal: isBoardPicker ? "right" : "left",
            }}
            transformOrigin={{
                vertical: isEditTaskPicker ? "center" : "top",
                horizontal: isBoardPicker ? "right" : "left",
            }}
            disablePortal
            slotProps={{
                paper: {
                    sx: {
                        top: isBoardPicker ? "unset" : `${TASK_PICKER_OFFSET} !important`,
                        maxHeight: "82vh",
                        borderRadius: "0.5rem",
                        boxShadow: "0px 2px 6px #1E1F2126, 0px 0px 1px #1E1F214F",
                    }
                },
            }}
        >
            <div className="dynamic-picker">
                <button
                    className="icon-btn dynamic-btn close-btn"
                    onClick={() => onClose(false)}
                >
                    <CloseIcon width={16} height={16} />
                </button>

                {renderPickerContent()}
            </div>
        </Popover>
    )
}

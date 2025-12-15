import { useEffect, useRef, useState } from 'react'
import Popover from '@mui/material/Popover'
import { BoardPicker } from './BoardPicker'
import { DatePicker } from "./DatePicker"
import { LabelPicker } from "./LabelPicker"
import { GroupPicker } from './GroupPicker'
import { CoverPicker } from './CoverPicker'
import { MemberPicker } from './MemberPicker'
import CloseIcon from '../../assets/images/icons/close.svg?react'

export function DynamicPicker({
    task,
    picker,
    anchorEl,
    open,
    onClose,
    setStarred,
    uploadedImages,
    isStarred,
    prefs,
    onUpdateBoard,
    onRemoveBoard,
    setIsAddingTask,
    boardId,
    groupId,
    onRemoveGroup,
    onUpdateTask,
    onAddLabel,
    onUpdateLabel,
    onRemoveLabel,
    members
}) {
    const popoverActions = useRef(null)
    const [isBoardPicker, setIsBoardPicker] = useState(false)
    const [isEditTaskPicker, setIsEditTaskPicker] = useState(false)

    useEffect(() => {
        if (picker.type === 'GroupPicker' || picker.type === 'BoardPicker') {
            setIsBoardPicker(true)
        } else if (picker.type === 'MemberPicker' || picker.type === 'LabelPicker' || picker.type === 'DatePicker') {
            setIsEditTaskPicker(true)
        }
    }, [picker.type])

    const renderPickerContent = () => {
        switch (picker.type) {
            case 'BoardPicker':
                return <BoardPicker
                    setStarred={setStarred}
                    isStarred={isStarred}
                    prefs={prefs}
                    uploadedImages={uploadedImages}
                    onUpdateBoard={onUpdateBoard}
                    onRemoveBoard={onRemoveBoard}
                />
            case 'GroupPicker':
                return <GroupPicker
                    setIsAddingTask={setIsAddingTask}
                    boardId={boardId}
                    groupId={groupId}
                    onRemoveGroup={onRemoveGroup}
                    onClose={onClose}
                />
            case 'LabelPicker':
                return <LabelPicker
                    task={task}
                    onUpdateTask={onUpdateTask}
                    onAddLabel={onAddLabel}
                    onUpdateLabel={onUpdateLabel}
                    onRemoveLabel={onRemoveLabel}
                />
            case 'DatePicker':
                return <DatePicker
                    task={task}
                    onUpdateTask={onUpdateTask}
                    onClose={onClose}
                />
            case 'MemberPicker':
                return <MemberPicker
                    members={members}
                    task={task}
                    onUpdateTask={onUpdateTask}
                    onClose={onClose}
                />
            case 'CoverPicker':
                return <CoverPicker
                    task={task}
                    onUpdateTask={onUpdateTask}
                    onClose={onClose}
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
            actions={popoverActions}
            anchorOrigin={{
                vertical: isEditTaskPicker ? "center" : "bottom",
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
                        top: isBoardPicker ? 'unset' : '68px !important',
                        maxHeight: '82vh',
                        borderRadius: '0.5rem',
                        boxShadow: '0px 2px 6px #1E1F2126, 0px 0px 1px #1E1F214F',
                    }
                },
            }}
        >
            <div className="dynamic-picker">
                <button
                    className="icon-btn dynamic-btn close-btn"
                    onClick={() => onClose(false)}
                >
                    <CloseIcon width={16} height={16} fill="currentColor" />
                </button>

                {renderPickerContent()}
            </div>
        </Popover>
    )
}

import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router'
import { useSelector } from 'react-redux'
import { boardService } from '../services/board'
import { addBoard } from '../store/actions/board.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { logout } from '../store/actions/user.actions'
import { getContrastingTextColor } from '../services/util.service'
import { DynamicPicker } from './picker/DynamicPicker'
import TrellisIcon from '../assets/images/icons/trellis.svg?react'
import osAvatarImg from '../assets/images/avatars/OS-avatar.png'

export function AppHeader() {
	// const user = useSelector(storeState => storeState.userModule.user)
	const navigate = useNavigate()
	const { pathname } = useLocation()

	const board = useSelector(storeState => storeState.boardModule.board)
	const boardBgColor = board?.prefs?.background
	const fontColor = boardBgColor ? getContrastingTextColor(boardBgColor) : 'black'


	const [picker, setPicker] = useState(null)
	const [anchorEl, setAnchorEl] = useState(null)
	const openPopover = Boolean(anchorEl)

	const PICKER_MAP = {
		CREATE_BOARD: {
			type: "CreateBoardPicker",
			info: {
				label: "Create Board:",
				propName: "createBoard",
			}
		}
	}

	const handlePopoverOpen = (event, pickerType) => {
		setAnchorEl(event.currentTarget)
		setPicker(pickerType)
	}

	const handlePopoverClose = () => {
		setAnchorEl(null)
	}

	async function onAddBoard(newBoard) {
		let board = boardService.getEmptyBoard()
		board = { ...board, ...newBoard }
		try {
			const savedBoard = await addBoard(board)
			navigate(`/board/${savedBoard._id}`)
			showSuccessMsg(`Board added`)
		} catch (err) {
			showErrorMsg('Cannot add board')
		}
	}

	async function onLogout() {
		try {
			await logout()
			navigate('/')
			showSuccessMsg(`Bye now`)
		} catch (err) {
			showErrorMsg('Cannot logout')
		}
	}

	const isHomePage = pathname.includes('/home')
	const isWorkspacePage = pathname.includes('/workspace')
	const isBoardPage = pathname.includes('/board')
	const headerClassName = `app-header full ${isHomePage ? 'home-header' : ''}`
	const headerStyle = isBoardPage
		? {
			backgroundColor: boardBgColor,
			color: fontColor
		}
		: {}

	const darckModeBtnStyle = {
		color: fontColor
	}

	return (
		<header style={headerStyle} className={headerClassName}>
			<nav>
				<NavLink to="/workspace" className="logo">
					<TrellisIcon width={24} height={24} fill="currentColor" />
					<span>Trellis</span>
				</NavLink>

				{isHomePage &&
					<div className="auth-actions">
						<NavLink to="/auth/login" className="login-link">
							Log in
						</NavLink>
						<NavLink to="/auth/signup" className="signup-link">
							Get Trellist for free
						</NavLink>
					</div>
				}

				{(isWorkspacePage || isBoardPage) &&
					<>
						<div className="actions">
							<input className="search-input" type="text" placeholder="Search" />
							<button
								style={darckModeBtnStyle}
								className="btn-secondary create-btn"
								onClick={(event) => {
									handlePopoverOpen(event, PICKER_MAP.CREATE_BOARD)
								}}
							>
								Create
							</button>
						</div>

						<div className="btn-group">
							<button className="dynamic-btn icon-btn" title="Oxana Shvartsman (oxanashvartsman)" >
								<img src={osAvatarImg} alt="Oxana Shvartsman" width={16} height={16} />
							</button>
						</div>
					</>
				}
			</nav>
			{picker && (
				<DynamicPicker
					picker={picker}
					open={openPopover}
					onClose={handlePopoverClose}
					anchorEl={anchorEl}
					onAddBoard={onAddBoard}
				/>
			)}
		</header>
	)
}

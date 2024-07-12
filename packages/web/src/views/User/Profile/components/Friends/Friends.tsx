type Props = {
	totalFriends: number;
	userId: string;
};

const Friends: React.FC<Props> = ({ totalFriends, userId }): React.JSX.Element => {
	return (
		<div>
			<h1>Friends</h1>
			<p>{`Total friends: ${totalFriends}`}</p>
			<p>{`User ID: ${userId}`}</p>
		</div>
	);
};

export default Friends;

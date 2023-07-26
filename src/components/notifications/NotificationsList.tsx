import { useEffect } from "react";
import { useKnockFeed } from "@knocklabs/react-notification-feed";
import NotificationCell from "./NotificationCell";


const NotificationsList = () => {
    const { feedClient, useFeedStore } = useKnockFeed();
    const items = useFeedStore((state) => state.items);

    useEffect(() => {
        // Once the feedClient is available, calling .fetch() will
        // populate the feed. In the background, a websocket is
        // opened that will receive new messages in real time.

        feedClient.fetch()
            .then((res) => {
                console.log("res", res)
            })
            .catch((err) => {
                console.log("err", err);
            })


    }, [feedClient]);

    return (
        <div className="notifications">
            {items.map((item) => (
                <NotificationCell key={item.id} item={item} />
            ))}
        </div>
    );
};

export default NotificationsList;
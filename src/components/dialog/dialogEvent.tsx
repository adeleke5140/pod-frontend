type EventDetail = {
  content: React.ReactNode;
};

type DialogEventName = "dialog:show" | "dialog:hide";

type DialogEvent = CustomEvent<EventDetail>;

export const DialogEvent = {
  listen(
    event: DialogEventName,
    callback: (content: React.ReactNode | null) => void
  ) {
    document.addEventListener(event, (e) => {
      const { detail } = e as DialogEvent;
      callback(detail.content);
    });
  },

  dispatch(event: DialogEventName, content: React.ReactNode) {
    document.dispatchEvent(new CustomEvent(event, { detail: { content } }));
  },
};

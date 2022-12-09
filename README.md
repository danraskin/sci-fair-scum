# sci-fair-scum
sci-fair-scum
server/client-side component of an IoT demonstration "art" project.

micro-controller will output photosensor data (RBG color) to nodejs script running locally. Node script posts data to server, which distributes posted data to clients through Server-Sent-Event (SSE) method.

<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
    <meta charset="UTF-8">
    <title>TGD chat</title>
    <link rel="stylesheet" href="css/main.css" />
</head>
<body>
<noscript>
    <h2>Sorry! Your browser doesn't support Javascript</h2>
</noscript>

<div id="username-page">
    <div class="username-page-container">
        <h1 class="title">Nhập username</h1>
        <form id="usernameForm" name="usernameForm">
            <div class="form-group">
                <input type="text" id="name" placeholder="Username" autocomplete="off" class="form-control" />
            </div>
            <h1 class="title">Nhập mã phòng</h1>
            <div class="form-group">
                <input type="text" id="room" placeholder="Mã phòng" autocomplete="off" class="form-control" />
            </div>
            <div class="form-group">
                <button type="submit" class="accent username-submit">Vào</button>
            </div>
        </form>
    </div>
</div>

<div id="chat-page" class="hidden">
    <div class="chat-container">
        <div class="chat-header">
            <h2>TDG chatapp</h2>
        </div>
        <div class="connecting">
            Đang kết nối...
        </div>
        <ul id="messageArea">

        </ul>
        <div class="send-box">
            <div>
                <input type="file" id="upload_file" onchange="uploadFile(event)">
                <button class="primary" id="button_upload">Gửi file</button>
            </div>
            <form id="messageForm" name="messageForm">
                <div class="form-group">
                    <div class="input-group clearfix">
                        <input type="text" id="message" placeholder="Nhập tin nhắn..." autocomplete="off" class="form-control"/>
                        <button type="submit" class="primary">Gửi tin</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.1.4/sockjs.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.min.js"></script>
<script src="js/main.js" charset="utf-8"></script>
</body>
</html>
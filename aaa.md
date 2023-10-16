<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>モーダルウィンドウ</title>
    <style>
        /* スタイル付け */
        body {
            font-family: Arial, sans-serif;
        }

        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
        }

        .modal-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #fff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            text-align: center;
        }

        /* モーダルを表示 */
        .modal:target {
            display: block;
        }
    </style>
</head>
<body>
    <a href="#openModal">
        <img src="your-image.jpg" alt="画像">
    </a>

    <!-- モーダルウィンドウ -->
    <div id="openModal" class="modal">
        <div class="modal-content">
            <h2>モーダルウィンドウのコンテンツ</h2>
            <p>ここにモーダルウィンドウ内のコンテンツを追加します。</p>
            <a href="#close" title="閉じる">閉じる</a>
        </div>
    </div>
</body>
</html>

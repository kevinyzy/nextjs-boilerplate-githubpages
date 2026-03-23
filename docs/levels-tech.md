https://guangzhengli.com/blog/zh/indie-hacker-tech-stack-2024

 Pieter Levels（@levelsio）是独立开发界的传奇人物，以**单人构建年入数百万美元的产品**而闻名。他的技术栈以**极简、快速、低成本**为核心哲学。

---

## 🎯 核心哲学

| 原则 | 具体表现 |
|-----|---------|
| **快速验证** | 几天内上线 MVP，不追求完美 |
| **极简技术栈** | 拒绝复杂框架，用最原始的技术 |
| **低成本运维** | 单服务器、SQLite、零容器编排 |
| **长期维护** | 代码简单到自己几年后还能看懂 |
| **一人全栈** | 不写测试，不写文档，不团队协作 |

---

## 🛠️ 技术栈详解

### 后端：原生 PHP（无框架）

```php
<?php
// 典型的 Levelsio 风格代码 - 来自 Nomad List 早期版本
// 单文件、过程式、直接 SQL

$db = new SQLite3('data.db');

// 路由就是 if-else
if ($_GET['page'] == 'cities') {
    $results = $db->query('SELECT * FROM cities WHERE nomad_score > 7');
    while ($row = $results->fetchArray()) {
        echo "<div class='city'>{$row['name']}</div>";
    }
}

// 内联 CSS/JS，单文件部署
?>
<!DOCTYPE html>
<html>
<head>
    <style>
        /* 直接写在这里，不打包不构建 */
        .city { padding: 10px; border: 1px solid #ccc; }
    </style>
</head>
<body>
    <!-- HTML 直接混编 -->
</body>
</html>
```

**关键特征：**
- **无框架**：不用 Laravel、Symfony
- **无 Composer**：极少依赖
- **单文件入口**：`index.php` 处理所有路由
- **过程式编程**：不追求 OOP 设计模式

### 数据库：SQLite

```php
<?php
// 数据库就是文件，备份 = 复制文件
$db = new SQLite3(__DIR__ . '/database.sqlite');

// 简单查询，无 ORM
$stmt = $db->prepare('SELECT * FROM users WHERE email = :email');
$stmt->bindValue(':email', $email, SQLITE3_TEXT);
$result = $stmt->execute();
```

**为什么选 SQLite：**
- 零配置，单文件存储
- 足够支撑百万级数据（他的产品验证过）
- 备份简单：rsync 复制文件即可
- 无需单独数据库服务器

### 前端：原生 JavaScript + Tailwind CSS

```html
<!-- 无构建工具，直接 CDN -->
<script src="https://cdn.tailwindcss.com"></script>
<script>
// 原生 JS，无 React/Vue
document.getElementById('search').addEventListener('input', function(e) {
    fetch('/api/search?q=' + e.target.value)
        .then(r => r.text())
        .then(html => {
            document.getElementById('results').innerHTML = html;
        });
});
</script>
```

**前端特点：**
- **HTMX/Alpine.js**（后期部分项目使用）：用于局部更新
- **服务端渲染**：PHP 直接输出 HTML，极少客户端渲染
- **无打包工具**：没有 Webpack/Vite，原生前端
- **Tailwind CDN**：开发时直接用 CDN，生产可能不打包

### 部署：单台 VPS（Hetzner/DigitalOcean）

```
┌─────────────────────────────────────┐
│           单台 VPS ($5-20/月)      │
│  ┌─────────┐  ┌─────────┐          │
│  │  Nginx  │  │  PHP-FPM │         │
│  │ (反向代理)│  │ (应用)   │         │
│  └─────────┘  └─────────┘          │
│  ┌─────────┐  ┌─────────┐          │
│  │ SQLite  │  │  静态文件 │          │
│  │ (数据库)│  │ (图片/JS)│          │
│  └─────────┘  └─────────┘          │
└─────────────────────────────────────┘
```

**部署方式：**
- **SFTP/SCP**：直接上传文件（不用 Git）
- **无 CI/CD**：手动部署，或简单 rsync 脚本
- **无 Docker**：直接装 PHP、Nginx
- **无 Kubernetes**：单机运行

---

## 📊 代表性产品架构

### Nomad List（数字游民社区）

| 组件 | 技术 |
|-----|------|
| 后端 | PHP 原生 |
| 数据库 | SQLite → 后期部分 MySQL |
| 缓存 | 文件缓存 / APCu |
| 搜索 | 自建简单倒排索引，或 Algolia |
| 支付 | Stripe 订阅 |
| 部署 | 单台 Hetzner 服务器 |
| 队列 | 无，同步处理或用 cron |

### Photo AI（AI 头像生成）

| 组件 | 技术 |
|-----|------|
| 后端 | PHP 原生 |
| AI 推理 | 调用 Replicate / Stability API |
| 图片存储 | 本地磁盘 + CDN |
| 队列 | 自建简单文件队列，或 Redis |
| 支付 | Stripe |
| 邮件 | Mailgun |

### Interior AI（AI 室内设计）

- 与 Photo AI 类似架构
- 重点：**快速复制已有模式**，不换技术栈

---

## 🔄 开发工作流

```bash
# 典型的 Levelsio 开发流程

# 1. 本地用 MAMP/XAMPP 或 PHP 内置服务器
php -S localhost:8000

# 2. 直接编辑文件，刷新浏览器看效果
# 没有热重载，没有构建步骤

# 3. 完成功能后，SFTP 上传到服务器
scp -r ./* root@server:/var/www/html/

# 4. 数据库变更：本地改好，上传覆盖
# 或使用简单的 migration 脚本（自己写的）
```

---

## 💡 关键实现方案

### 1. 无框架路由系统

```php
<?php
// index.php - 所有请求入口
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$routes = [
    '/' => 'pages/home.php',
    '/cities' => 'pages/cities.php',
    '/api/search' => 'api/search.php',
];

if (isset($routes[$path])) {
    require $routes[$path];
} else {
    http_response_code(404);
    require 'pages/404.php';
}
```

### 2. 极简认证

```php
<?php
// 无 JWT，无 OAuth 库，直接 session
session_start();

// 登录
if ($_POST['password'] === getenv('ADMIN_PASSWORD')) {
    $_SESSION['user_id'] = 1;
}

// 检查登录
function isLoggedIn() {
    return isset($_SESSION['user_id']);
}
```

### 3. 文件队列（替代 Redis/RabbitMQ）

```php
<?php
// 简单的文件队列实现
function queuePush($job) {
    $queueFile = __DIR__ . '/queue/jobs.txt';
    file_put_contents($queueFile, json_encode($job) . "\n", FILE_APPEND);
}

function queueWorker() {
    $queueFile = __DIR__ . '/queue/jobs.txt';
    $lines = file($queueFile, FILE_IGNORE_NEW_LINES);
    
    foreach ($lines as $line) {
        $job = json_decode($line, true);
        processJob($job); // 处理任务
    }
    
    // 清空队列
    file_put_contents($queueFile, '');
}
```

### 4. 缓存策略

```php
<?php
// 文件缓存，无 Redis
function cacheGet($key) {
    $file = __DIR__ . '/cache/' . md5($key) . '.txt';
    if (!file_exists($file)) return null;
    if (filemtime($file) < time() - 3600) return null; // 1小时过期
    return unserialize(file_get_contents($file));
}

function cacheSet($key, $value) {
    $file = __DIR__ . '/cache/' . md5($key) . '.txt';
    file_put_contents($file, serialize($value));
}
```

---

## 📈 他的产品数据（参考）

| 产品 | 年收入 | 技术成本 |
|-----|--------|---------|
| Nomad List | $200万+ | ~$100/月（服务器） |
| Photo AI | $100万+ | ~$500/月（含 AI API） |
| Interior AI | $50万+ | 类似 Photo AI |
| **总计** | **$300万+** | **< $1000/月** |

---

## ⚖️ 优缺点分析

| 优势 | 劣势 |
|-----|------|
| 开发速度极快（几天出 MVP） | 代码难以团队协作 |
| 维护成本低（自己全懂） | 技术债务累积 |
| 服务器成本几乎为零 | 扩展性有天花板 |
| 调试简单（没有抽象层） | 现代开发体验差 |
| 长期稳定（无依赖更新烦恼） | 招工程师困难 |

---

## 🎯 给你的启示（Next.js 场景）

如果你想借鉴他的哲学，但用现代技术：

| Levelsio 方式 | Next.js 等效方案 |
|-------------|----------------|
| 原生 PHP | Next.js App Router + Server Actions |
| SQLite | Turso (SQLite 边缘版) / Vercel Postgres |
| 单文件路由 | Next.js 文件系统路由 |
| 无构建前端 | Next.js 默认 SSR，少客户端 JS |
| 单服务器 | Vercel Hobby（免费）→ Pro（$20） |
| 无 CI/CD | Vercel Git 集成自动部署 |
| 直接 SQL | Drizzle ORM（轻量类型安全） |

**核心 takeaway**：选择**刚好够用**的技术，把精力投入到**产品和营销**上。

需要我针对你的具体项目，设计一个"Levelsio 风格"的 Next.js 技术方案吗？

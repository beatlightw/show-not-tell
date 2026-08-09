# 跟着大师学描写

英语文学写作教学网站：从经典文学原句出发，对照平淡的 Tell 与生动的 Show，提炼可复用的描写技巧。

## 本地运行

```bash
pnpm install
pnpm dev
```

打开终端提示的本地地址即可预览。生产构建用 `pnpm build`，预览构建产物用 `pnpm preview`。

> 如果本机没有全局 Node/npm，可以使用 Codex 桌面版自带的运行时：把 `node` 的可执行目录加入 PATH 后，再运行上面的 pnpm 命令。

## 线上地址

网站已部署到 GitHub Pages：

- 自定义域名：[https://writing.cc.cd/](https://writing.cc.cd/)
- GitHub 原始地址：[https://beatlightw.github.io/show-not-tell/](https://beatlightw.github.io/show-not-tell/)

`gh-pages` 分支保存构建产物，更新时重新构建并推送该分支即可上线。

## 如何更新内容

所有教学内容都写在 `src/content/books.json` 里。修改后保存文件，刷新浏览器即可看到变化，不需要改动任何代码。

### 数据格式

顶层是一个 `books` 数组，每本书一个对象：

```json
{
  "id": "唯一标识",
  "title": "书名",
  "titleEn": "可选：英文书名，用于英文界面",
  "author": "作者",
  "authorEn": "可选：英文作者名，用于英文界面",
  "coverImage": "封面图路径，如 /images/books/great-expectations.jpg",
  "intro": "这本书的简介",
  "introEn": "可选：英文简介，用于英文界面",
  "lessons": [
    {
      "id": "课时唯一标识",
      "title": "课时标题",
      "titleEn": "可选：英文课时标题",
      "scene": "场景描述",
      "sceneEn": "可选：英文场景描述",
      "photo": "课时照片路径，如 /images/lessons/room.jpg",
      "source": "例句出处，如 Chapter 1",
      "tell": "Tell 版本，平铺直叙的写法",
      "show": "Show 版本，大师原句",
      "translation": "可选的中文译文，不需要时删掉该字段",
      "techniques": ["写作技巧一", "写作技巧二", "写作技巧三"],
      "techniquesEn": ["可选：英文写作技巧，用于英文界面"]
    }
  ]
}
```

### 添加一本书

复制上面示例中的一个书籍对象，改成新书的 `id`、`title` 等信息，追加到 `books` 数组末尾即可。`id` 不能重复，路由地址会使用它。

`titleEn`、`authorEn`、`introEn`、课时里的 `titleEn`、`sceneEn`、`techniquesEn` 都是可选项。网站切换到英文界面时优先使用这些英文字段；没有填写时自动回退到中文内容。

### 添加一个课时

在对应书籍的 `lessons` 数组末尾追加一个课时对象，同样保证 `id` 唯一。

### 更换照片

1. 把封面图放进 `public/images/books/`，课时照片放进 `public/images/lessons/`。
2. 在 JSON 的 `coverImage` 或 `photo` 字段中填写 `/images/books/文件名` 或 `/images/lessons/文件名`。
3. 路径留空或图片不存在时，网站会自动显示内置占位图。

### 删除示例书籍

删除 `books` 数组中 `id` 为 `demo-book` 的那个对象即可。

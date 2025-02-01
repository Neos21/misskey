# [ねゃおすきー](https://misskey.neos21.net)

[Misskey](https://github.com/misskey-dev/misskey) をフォークして独自機能を付与して運営しています。


## 変更した主な部分

- 2025-02-01
    - `nyaize()` 関数を無効化
        - `packages/misskey-js/src/nyaize.ts`
    - 「この投稿は迷惑になる可能性があります」ダイアログを無効化
        - `packages/frontend/src/components/MkPostForm.vue`
- 2025-01-30
    - ページ上部の「チャンネル」アイコンを削除
        - `packages/frontend/src/pages/timeline.vue`
- 2025-01-29
    - バージョンアップ等のバナー通知が出ないように変更
        - `packages/frontend/src/boot/main-boot.ts`
    - 「ノート」ではなく「ツイート」と呼称するように変更
        - `locales/ja-JP.yml`
- 2025-01-27
    - `README.md` と `.github/FUNDING.yml` を更新
    - 「オンラインユーザー詳細」ウィジェットを追加
        - `package.json` : locale ファイルのキャッシュ更新のためにはバージョン番号アップが必要
        - `locales/en-US.yml`
        - `locales/ja-JP.yml`
        - `locales/ja-KS.yml`
        - `locales/index.d.ts`
        - `packages/backend/src/server/api/endpoints/get-online-users-count.ts`
        - `packages/frontend/src/widgets/WidgetOnlineUsersDetails.vue` : 新規追加
        - `packages/frontend/src/widgets/index.ts`
        - `packages/misskey-js/package.json`
        - `packages/misskey-js/src/autogen/types.ts`
    - 一つの投稿に対し複数リアクションを追加できるように変更
        - `packages/backend/migration/1000000000000-Init.js` : `DROP INDEX "IDX_ad0c221b25672daf2df320a817";` する
        - `packages/backend/src/core/ReactionService.ts`
        - `packages/backend/src/core/entities/NoteEntityService.ts`
        - `packages/backend/src/server/api/endpoints/notes/reactions/delete.ts`
        - `packages/frontend/src/components/MkNote.vue`
        - `packages/frontend/src/components/MkNoteDetailed.vue`
        - `packages/frontend/src/components/MkReactionsViewer.reaction.vue`
        - `packages/frontend/src/components/MkReactionsViewer.vue`
        - `packages/misskey-js/src/autogen/types.ts`
        - `packages/frontend/src/scripts/use-note-capture.ts`
- 2025-01-25
    - フロントエンドの `pnpm dev` スクリプトに関して `vite --host` オプションを追加
        - `packages/frontend/package.json`
    - サイドメニューに「カスタム絵文字」「Favoriya」「Neo's Discord」リンクを追加
        - `packages/frontend/src/ui/_common_/navbar.vue`
        - `packages/frontend/src/ui/classic.sidebar.vue`
        - `packages/frontend/src/ui/_common_/navbar-for-mobile.vue`
- 2025-01-22
    - 未ログイン時トップページ右上の GitHub リンク先を変更
        - `packages/frontend/src/ui/visitor.vue`


## Links

- [Neo's World](https://neos21.net/)

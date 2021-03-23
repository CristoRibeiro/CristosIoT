interface IContents {
  [key: string]: string;
}

export default interface IMessage {
  app_id: string;
  contents: IContents;
  include_player_ids: Array<string>;
}

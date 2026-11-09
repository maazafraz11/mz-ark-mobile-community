export type ServerType = "PvE" | "PvP";
export type Server = { id:string;name:string;tag:string;region:string;gameVersion:string;serverType:ServerType;rates:string;description:string;rules:string[];discord:string;website:string;banner:string;logo:string;featured:boolean;category:string;playerCount:string;rating:number;reviews:number;status:"Open"|"Moderated"|"Maintaining" };
export type Review={id:string;author:string;rating:number;message:string;date:string};

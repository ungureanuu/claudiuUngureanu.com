export class ApiResponse<T> {
  public answearcode: number;
  public items: T[];
  public message: string;
}

export class ApiCallObject {
  public basePath: string;
  public urlPath: string;
  public urlParams: any;
  public queryParams: any;
  public payload: any;
  public successMessage: string;
  public useSnackBar: boolean;

  constructor(
    _basePath?: string,
    _urlPath?: string,
    _urlParams?: any,
    _queryParams?: any,
    _payload?: any,
    _successMessage?: string,
    _useSnackBar?: boolean
  ) {
    this.basePath = _basePath;
    this.urlPath = _urlPath;
    this.urlParams = _urlParams;
    this.queryParams = _queryParams;
    this.payload = _payload;
    this.successMessage = _successMessage;
    this.useSnackBar = _useSnackBar;

    if (typeof _useSnackBar === 'undefined') {
      this.useSnackBar = true;
    }
  }
}

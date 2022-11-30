export interface FeatureFlag {
    Name: string,
    Value: string | number | boolean,
    Description: string,
    DataType: 'STRING' | 'NUMBER' | 'BOOLEAN',
    Type: 'TEMPORARY' | 'PERMANENT',
    ExpirationDate: string,
    Developer: string,
    CreatedDate: string
}
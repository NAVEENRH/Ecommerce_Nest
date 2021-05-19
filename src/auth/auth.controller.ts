import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
  Param,
  Res,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt.guard';
import { UserService } from './user/user.service';
import { diskStorage } from "multer";
import { FileInterceptor } from "@nestjs/platform-express";
import { UserEntity } from './entities/user.entity';
import { v4 as uuidv4 } from "uuid";
import path = require('path');
import { catchError, map, tap } from 'rxjs/operators';
import { join } from 'node:path';


// export const storage = {
//   storage: diskStorage({
//       destination: './uploads/profileimages',
//       filename: (req, file, cb) => {
//           const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
//           const extension: string = path.parse(file.originalname).ext;

//           cb(null, `${filename}${extension}`)
//       }
//   })

// }

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) { }

  @Post('login')
  @HttpCode(200)
  @ApiOkResponse({ description: 'Login Successful' })
  @ApiBadRequestResponse({
    description: 'User does not exists or invalid login details',
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @ApiCreatedResponse({ description: 'New user account created' })
  @ApiBadRequestResponse({ description: 'User already exists or server error' })
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    // user : userId, email : from JwtStrategy
    return this.userService.findById(req.user.userId);
  }

//   @UseGuards(JwtAuthGuard)
//   @Post("upload")
//   @UseInterceptors(
//       FileInterceptor("image", {
//           storage: diskStorage({
//               destination: "./upload/profileImage",
//               filename: (req: any, file: any, callback: any) => {
//                   return callback(null, `${uuidv4()}${file.originalname}`);
//               },
//           }),
//       })
//   )
//  async uploadFile(@UploadedFile() file: Express.Multer.File, @Request() req: any) {
//       const user: UserEntity = req.user.user;
//       console.log(user);

//       console.log(file);

//     return of( { imagePath: file.filename } );
//   }

// @UseGuards(JwtAuthGuard)
//     @Post('upload')
//     @UseInterceptors(FileInterceptor('file', storage))
//      async uploadFile(@UploadedFile() file: Express.Multer.File, @Request() req: any) {
//       const user: UserEntity = req.user.user;
//       console.log(user);

//       console.log(file);

//     return of( { imagePath: file.filename } );
//   }
//     uploadFile(@UploadedFile() file, @Request() req): Observable<Object> {
//         const user: UserEntity = req.user;

//         return this.userService.updateOne(user.userId, {profileImage: file.filename}).pipe(
//             tap((user: UserEntity) => console.log(user)),
//             map((user:UserEntity) => ({profileImage: user.profileImage}))
//         )
//     }

    // @Get('profile-image/:imagename')
    // findProfileImage(@Param('imagename') imagename, @Res() res): Observable<Object> {
    //     return of(res.sendFile(join(process.cwd(), 'uploads/' + imagename)));
    // }
  //   @Get('uploads/:fileId')
  // async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
  //   res.sendFile(fileId, { root: 'avatars'});
  // }

  @UseGuards(JwtAuthGuard)
    @Post("upload")
    @UseInterceptors(
        FileInterceptor("file", {
            storage: diskStorage({
                destination: "./upload/profileimage",
                filename: (req: any, file: any, callback: any) => {
                    return callback(null, `${uuidv4()}${file.originalname}`);
                },
            }),
        })
    )
    uploadFile(@UploadedFile() file: Express.Multer.File, @Request() req) {
        const user: UserEntity = req.user;

        console.log(file);

        
        return this.userService
            .updateOne(user.userId, { profileImage: file.filename })
            .pipe(
                tap((user: UserEntity) => console.log(user)),
                map((user: UserEntity) => ({ profileImage: user.profileImage }))
            );
    }

    @Get("profileImage/:fileId")
    async serveAvatar(@Param("fileId") fileId, @Res() res): Promise<any> {
        return res.sendFile(fileId, { root: "upload/profileImage" });
    }

}
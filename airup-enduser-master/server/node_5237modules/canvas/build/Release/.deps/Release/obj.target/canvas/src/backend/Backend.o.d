cmd_Release/obj.target/canvas/src/backend/Backend.o := c++ '-DNODE_GYP_MODULE_NAME=canvas' '-DUSING_UV_SHARED=1' '-DUSING_V8_SHARED=1' '-DV8_DEPRECATION_WARNINGS=1' '-DV8_DEPRECATION_WARNINGS' '-DV8_IMMINENT_DEPRECATION_WARNINGS' '-D_DARWIN_USE_64_BIT_INODE=1' '-D_LARGEFILE_SOURCE' '-D_FILE_OFFSET_BITS=64' '-DOPENSSL_NO_PINSHARED' '-DOPENSSL_THREADS' '-DHAVE_GIF' '-DHAVE_JPEG' '-DHAVE_RSVG' '-DBUILDING_NODE_EXTENSION' -I/Users/runner/Library/Caches/node-gyp/14.18.2/include/node -I/Users/runner/Library/Caches/node-gyp/14.18.2/src -I/Users/runner/Library/Caches/node-gyp/14.18.2/deps/openssl/config -I/Users/runner/Library/Caches/node-gyp/14.18.2/deps/openssl/openssl/include -I/Users/runner/Library/Caches/node-gyp/14.18.2/deps/uv/include -I/Users/runner/Library/Caches/node-gyp/14.18.2/deps/zlib -I/Users/runner/Library/Caches/node-gyp/14.18.2/deps/v8/include -I../node_modules/nan -I/usr/local/Cellar/libffi/3.4.2/include -I/usr/local/Cellar/cairo/1.16.0_5/include/cairo -I/usr/local/Cellar/glib/2.70.2/include -I/usr/local/Cellar/glib/2.70.2/include/glib-2.0 -I/usr/local/Cellar/glib/2.70.2/lib/glib-2.0/include -I/usr/local/opt/gettext/include -I/usr/local/Cellar/pcre/8.45/include -I/usr/local/Cellar/pixman/0.40.0/include/pixman-1 -I/usr/local/Cellar/fontconfig/2.13.1/include -I/usr/local/opt/freetype/include/freetype2 -I/usr/local/Cellar/libpng/1.6.37/include/libpng16 -I/usr/local/Cellar/libxcb/1.14_1/include -I/usr/local/Cellar/libxrender/0.9.10/include -I/usr/local/Cellar/libxext/1.3.4/include -I/usr/local/Cellar/libx11/1.7.3.1/include -I/usr/local/Cellar/libxau/1.0.9/include -I/usr/local/Cellar/libxdmcp/1.1.3/include -I/usr/local/Cellar/xorgproto/2021.5/include -I/usr/local/Cellar/pango/1.50.3/include/pango-1.0 -I/usr/local/Cellar/harfbuzz/3.2.0/include/harfbuzz -I/usr/local/Cellar/fribidi/1.0.11/include/fribidi -I/usr/local/Cellar/graphite2/1.3.14/include -I/usr/local/Cellar/librsvg/2.50.7/include/librsvg-2.0 -I/usr/local/Cellar/gdk-pixbuf/2.42.6/include/gdk-pixbuf-2.0 -I/usr/local/Cellar/libtiff/4.3.0/include  -O3 -gdwarf-2 -mmacosx-version-min=10.13 -arch x86_64 -Wall -Wendif-labels -W -Wno-unused-parameter -std=gnu++1y -stdlib=libc++ -fno-rtti -fno-strict-aliasing -MMD -MF ./Release/.deps/Release/obj.target/canvas/src/backend/Backend.o.d.raw   -c -o Release/obj.target/canvas/src/backend/Backend.o ../src/backend/Backend.cc
Release/obj.target/canvas/src/backend/Backend.o: \
  ../src/backend/Backend.cc ../src/backend/Backend.h \
  /usr/local/Cellar/cairo/1.16.0_5/include/cairo/cairo.h \
  /usr/local/Cellar/cairo/1.16.0_5/include/cairo/cairo-version.h \
  /usr/local/Cellar/cairo/1.16.0_5/include/cairo/cairo-features.h \
  /usr/local/Cellar/cairo/1.16.0_5/include/cairo/cairo-deprecated.h \
  ../src/backend/../dll_visibility.h ../node_modules/nan/nan.h \
  /Users/runner/Library/Caches/node-gyp/14.18.2/include/node/node_version.h \
  /Users/runner/Library/Caches/node-gyp/14.18.2/include/node/uv.h \
  /Users/runner/Library/Caches/node-gyp/14.18.2/include/node/uv/errno.h \
  /Users/runner/Library/Caches/node-gyp/14.18.2/include/node/uv/version.h \
  /Users/runner/Library/Caches/node-gyp/14.18.2/include/node/uv/unix.h \
  /Users/runner/Library/Caches/node-gyp/14.18.2/include/node/uv/threadpool.h \
  /Users/runner/Library/Caches/node-gyp/14.18.2/include/node/uv/darwin.h \
  /Users/runner/Library/Caches/node-gyp/14.18.2/include/node/node.h \
  /Users/runner/Library/Caches/node-gyp/14.18.2/include/node/v8.h \
  /Users/runner/Library/Caches/node-gyp/14.18.2/include/node/cppgc/common.h \
  /Users/runner/Library/Caches/node-gyp/14.18.2/include/node/v8config.h \
  /Users/runner/Library/Caches/node-gyp/14.18.2/include/node/v8-internal.h \
  /Users/runner/Library/Caches/node-gyp/14.18.2/include/node/v8-version.h \
  /Users/runner/Library/Caches/node-gyp/14.18.2/include/node/v8-platform.h \
  /Users/runner/Library/Caches/node-gyp/14.18.2/include/node/node_buffer.h \
  /Users/runner/Library/Caches/node-gyp/14.18.2/include/node/node_object_wrap.h \
  ../node_modules/nan/nan_callbacks.h \
  ../node_modules/nan/nan_callbacks_12_inl.h \
  ../node_modules/nan/nan_maybe_43_inl.h \
  ../node_modules/nan/nan_converters.h \
  ../node_modules/nan/nan_converters_43_inl.h \
  ../node_modules/nan/nan_new.h \
  ../node_modules/nan/nan_implementation_12_inl.h \
  ../node_modules/nan/nan_persistent_12_inl.h \
  ../node_modules/nan/nan_weak.h ../node_modules/nan/nan_object_wrap.h \
  ../node_modules/nan/nan_private.h \
  ../node_modules/nan/nan_typedarray_contents.h \
  ../node_modules/nan/nan_json.h ../node_modules/nan/nan_scriptorigin.h
../src/backend/Backend.cc:
../src/backend/Backend.h:
/usr/local/Cellar/cairo/1.16.0_5/include/cairo/cairo.h:
/usr/local/Cellar/cairo/1.16.0_5/include/cairo/cairo-version.h:
/usr/local/Cellar/cairo/1.16.0_5/include/cairo/cairo-features.h:
/usr/local/Cellar/cairo/1.16.0_5/include/cairo/cairo-deprecated.h:
../src/backend/../dll_visibility.h:
../node_modules/nan/nan.h:
/Users/runner/Library/Caches/node-gyp/14.18.2/include/node/node_version.h:
/Users/runner/Library/Caches/node-gyp/14.18.2/include/node/uv.h:
/Users/runner/Library/Caches/node-gyp/14.18.2/include/node/uv/errno.h:
/Users/runner/Library/Caches/node-gyp/14.18.2/include/node/uv/version.h:
/Users/runner/Library/Caches/node-gyp/14.18.2/include/node/uv/unix.h:
/Users/runner/Library/Caches/node-gyp/14.18.2/include/node/uv/threadpool.h:
/Users/runner/Library/Caches/node-gyp/14.18.2/include/node/uv/darwin.h:
/Users/runner/Library/Caches/node-gyp/14.18.2/include/node/node.h:
/Users/runner/Library/Caches/node-gyp/14.18.2/include/node/v8.h:
/Users/runner/Library/Caches/node-gyp/14.18.2/include/node/cppgc/common.h:
/Users/runner/Library/Caches/node-gyp/14.18.2/include/node/v8config.h:
/Users/runner/Library/Caches/node-gyp/14.18.2/include/node/v8-internal.h:
/Users/runner/Library/Caches/node-gyp/14.18.2/include/node/v8-version.h:
/Users/runner/Library/Caches/node-gyp/14.18.2/include/node/v8-platform.h:
/Users/runner/Library/Caches/node-gyp/14.18.2/include/node/node_buffer.h:
/Users/runner/Library/Caches/node-gyp/14.18.2/include/node/node_object_wrap.h:
../node_modules/nan/nan_callbacks.h:
../node_modules/nan/nan_callbacks_12_inl.h:
../node_modules/nan/nan_maybe_43_inl.h:
../node_modules/nan/nan_converters.h:
../node_modules/nan/nan_converters_43_inl.h:
../node_modules/nan/nan_new.h:
../node_modules/nan/nan_implementation_12_inl.h:
../node_modules/nan/nan_persistent_12_inl.h:
../node_modules/nan/nan_weak.h:
../node_modules/nan/nan_object_wrap.h:
../node_modules/nan/nan_private.h:
../node_modules/nan/nan_typedarray_contents.h:
../node_modules/nan/nan_json.h:
../node_modules/nan/nan_scriptorigin.h:
